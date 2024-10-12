import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './auth/auth-apikey.strategy';
import { WorkPackage, WorkPackagesService } from './work-packages.service';

@Controller('work-packages')
export class WorkPackagesController {
  constructor(private readonly workPackageService: WorkPackagesService) {}
  private readonly logger = new Logger(WorkPackagesController.name);

  @Post()
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.CREATED)
  createWorkPackage(@Body() createWorkPackageDto: { id: string; content: string }) {
    this.logger.log('Creating a new work package', JSON.stringify(createWorkPackageDto));
    // Logic to create a work package
    return this.workPackageService.newWorkPackage(createWorkPackageDto.id, createWorkPackageDto.content);
  }

  @Get(':id(*)') // todo replace * with a pattern to forbid misuse with replative paths
  @UseGuards(ApiKeyGuard)
  async getWorkPackage(@Param('id') id: string): Promise<{ id; content; }> {
    this.logger.log(`Retrieving work package with id: ${id}`);
    // Logic to retrieve a work package by id
    return { id, content: await this.workPackageService.getWorkPackage(id) };
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  updateWorkPackage(
    @Param('id') id: string,
    @Body() updateWorkPackageDto: { name?: string; description?: string; parentPackagePath?: string },
  ) {
    this.logger.log(`Updating work package with id: ${id}`, JSON.stringify(updateWorkPackageDto));
    // Logic to update a work package by id
    return { message: 'Work package updated successfully', id, data: updateWorkPackageDto };
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteWorkPackage(@Param('id') id: string) {
    this.logger.log(`Deleting work package with id: ${id}`);
    // Logic to delete a work package by id
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  getAllWorkPackages(): WorkPackage[] {
    this.logger.log('Retrieving all work packages');
    return this.workPackageService.getAllWorkPackages();
  }
}



@Controller('work-packages/:id/link-requirement')
export class LinkRequirementController {
  private readonly logger = new Logger(LinkRequirementController.name);

  @Post()
  linkRequirement(@Param('id') id: string, @Body() linkRequirementDto: { requirementPath: string }) {
    this.logger.log(`Linking requirement to work package with id: ${id}`, JSON.stringify(linkRequirementDto));
    // Logic to link a requirement to a work package
    return { message: 'Requirement linked successfully', id, data: linkRequirementDto };
  }
}
