import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import * as path from 'path';
export type WorkPackage = { id: string; path: string };

const exists = promisify(fs.exists);

@Injectable()
export class WorkPackagesService {
  knownWps: WorkPackage[] = [];
  getAllWorkPackages(): WorkPackage[] {
    if (!(fs as any).globSync) throw new Error('glob is not supported in this environment, update to node >22',);
    this.knownWps = (fs as any).globSync('./**/*.req.md').map((file) => {
      const filename = path.basename(file);
      const filepath = path.dirname(file);
      return { id: filename.replace(/\.req\.md$/, ''), path: filepath };
    });
    return this.knownWps;
  }

  async getWorkPackage(id: string): Promise<string> {
    if (!this.knownWps.length) await this.getAllWorkPackages();
    const wp = this.knownWps.find((wp) => wp.id === id);
    if (!wp)
      throw new HttpException(`Work package with id ${id} not found here are all packages we know:\n ${this.knownWps.join('\n')} try again`,HttpStatus.NOT_FOUND);
    const fullPath = path.join(wp.path, wp.id + '.req.md');
    return await fs.promises.readFile(fullPath, 'utf-8');
  }

  async newWorkPackage(id: string, content: string, wpPath: string = '.',): Promise<WorkPackage> {
    const filepath = path.join(wpPath, id + '.req.md');
    if (!(await exists(filepath))) {
      // File does not exist
      await fs.promises.writeFile(filepath, content);
      this.knownWps.push({ id, path: wpPath });
      return { id, path: wpPath };
    } else throw new HttpException(`Work package with id ${id} already exists`,HttpStatus.CONFLICT);
  }
}
