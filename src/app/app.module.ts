import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ManageBrandsComponent } from './components/manage-brands/manage-brands.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NewFixedBrandComponent } from './components/fixed/new-fixed-brand/new-fixed-brand.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LogMessageComponent } from './components/log-message/log-message.component';
import { ManagementGroupsComponent } from './components/management-groups/management-groups.component';
import { NewFixedManagementGroupComponent } from './components/fixed/new-fixed-management-group/new-fixed-management-group.component';
import { DinamicFilterComponent } from './components/dinamic-filter/dinamic-filter.component';
import { HomeComponent } from './components/home/home.component';
import { FilterDebtValueComponent } from './components/filter-debt-value/filter-debt-value.component';
import { DepartmentFilterComponent } from './components/department-filter/department-filter.component';
import { SegmentFilterComponent } from './components/segment-filter/segment-filter.component';
import { TenureFilterComponent } from './components/tenure-filter/tenure-filter.component';
import { EventsManagerComponent } from './components/events-manager/events-manager.component';
import { FixedBrandsListComponent } from './components/fixed/fixed-brands-list/fixed-brands-list.component';
import { FixedGroupsListComponent } from './components/fixed/fixed-groups-list/fixed-groups-list.component';
import { FixedCategoryListComponent } from './components/fixed/fixed-category-list/fixed-category-list.component';
import { DevelopingComponent } from './components/developing/developing.component';
import { FixedSubCategoriesListComponent } from './components/fixed/fixed-sub-categories-list/fixed-sub-categories-list.component';
import { FixedSubcategoryElementsListComponent } from './components/fixed/fixed-subcategory-elements-list/fixed-subcategory-elements-list.component';
import { RegionalFilterComponent } from './components/regional-filter/regional-filter.component';
import { ScriptMessageComponent } from './components/fixed/script-message/script-message.component';

import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { LinkComponent } from './components/fixed/link/link.component';
import { ContactOptionsComponent } from './components/fixed/contact-options/contact-options.component';
import { SubjectComponent } from './components/fixed/subject/subject.component';
import { AgeDebtComponent } from './components/fixed/age-debt/age-debt.component';
import { UsersManagerComponent } from './components/users-manager/users-manager.component';
import { RoleGuardServiceService as RoleGuard } from './services/role-guard-service.service';
import { AttachmentComponent } from './components/fixed/attachment/attachment.component'
import { FileUploadModule } from 'ng2-file-upload';
import { ResizableModule } from 'angular-resizable-element';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { FixedWorkflowListComponent } from './components/fixed/fixed-workflow-list/fixed-workflow-list.component';
import { NewFixedWorkflowComponent } from './components/fixed/new-fixed-workflow/new-fixed-workflow.component';
import { HomeSymbolComponent } from './components/symbolsWorkflow/home-symbol/home-symbol.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { EndSymbolComponent } from './components/symbolsWorkflow/end-symbol/end-symbol.component';
import { HoldSymbolComponent } from './components/symbolsWorkflow/hold-symbol/hold-symbol.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ToolboxWorkflowComponent } from './components/symbolsWorkflow/toolbox-workflow/toolbox-workflow.component';
import { WorkflowAreaComponent } from './components/symbolsWorkflow/workflow-area/workflow-area.component';
import { AdDirective } from './models/dynamicClass/ad.directive';
import { VerifypaymentSymbolComponent } from './components/symbolsWorkflow/verifypayment-symbol/verifypayment-symbol.component';
import { EventSymbolComponent } from './components/symbolsWorkflow/event-symbol/event-symbol.component';
import { NewpropertiesDirective } from './models/dynamicClass/newproperties.directive';
import { ConnectinglineSymbolComponent } from './components/symbolsWorkflow/connectingline-symbol/connectingline-symbol.component';
import { PropertiesconectinglineDirective } from './models/dynamicClass/propertiesconectingline.directive';
import { ManagerComponent } from './components/manager/manager.component';
import { FixedManagerListComponent } from './components/fixed/fixed-manager-list/fixed-manager-list.component';
import { NewFixedManagementComponent } from './components/fixed/new-fixed-management/new-fixed-management.component';
import { CalendarOptionsComponent } from './components/fixed/calendar-options/calendar-options.component';
import { FixedEditWorkFlowComponent } from './components/fixed/fixed-edit-work-flow/fixed-edit-work-flow.component';
import { EmailTemplatesComponent } from './components/fixed/email-templates/email-templates.component';
import { MobileGroupsListComponent } from './components/mobile/mobile-groups-list/mobile-groups-list.component';
import { MobileWorkflowListComponent } from './components/mobile/mobile-workflow-list/mobile-workflow-list.component';
import { MobileBrandsListComponent } from './components/mobile/mobile-brands-list/mobile-brands-list.component';
import { MobileManagerListComponent } from './components/mobile/mobile-manager-list/mobile-manager-list.component';
import { MobileCategoryListComponent } from './components/mobile/mobile-category-list/mobile-category-list.component';
import { MobileSubCategoriesListComponent } from './components/mobile/mobile-sub-categories-list/mobile-sub-categories-list.component';
import { MobileSubCategoryElementsListComponent } from './components/mobile/mobile-sub-category-elements-list/mobile-sub-category-elements-list.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NewMobileWorkflowComponent } from './components/mobile/new-mobile-workflow/new-mobile-workflow.component';
import { NewMobileManagementGroupComponent } from './components/mobile/new-mobile-management-group/new-mobile-management-group.component';
import { NewMobileBrandComponent } from './components/mobile/new-mobile-brand/new-mobile-brand.component';
import { MobileEditWorkFlowComponent } from './components/mobile/mobile-edit-work-flow/mobile-edit-work-flow.component';
import { NewMobileManagementComponent } from './components/mobile/new-mobile-management/new-mobile-management.component';
import { PendingChangesGuardService } from './services/pending-changes-guard.service';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { RonanConfigurationComponent } from './components/ronan-configuration/ronan-configuration.component';
import { UpdateFixedBrandComponent } from './components/fixed/update-fixed-brand/update-fixed-brand.component';
import { UpdateMobileBrandComponent } from './components/mobile/update-mobile-brand/update-mobile-brand.component';
import { ViewWorkFlowComponent } from './components/view-work-flow/view-work-flow.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { FailedEventsChartComponent } from './components/failed-events-chart/failed-events-chart.component';





@NgModule({
  declarations: [
    AppComponent,
    ManageBrandsComponent,
    MainMenuComponent,
    NavigationBarComponent,
    NewFixedBrandComponent,
    ConfirmDialogComponent,
    LogMessageComponent,
    ManagementGroupsComponent,
    NewFixedManagementGroupComponent,
    DinamicFilterComponent,
    HomeComponent,
    FilterDebtValueComponent,
    DepartmentFilterComponent,
    SegmentFilterComponent,
    TenureFilterComponent,
    EventsManagerComponent,
    FixedBrandsListComponent,
    FixedGroupsListComponent,
    FixedCategoryListComponent,
    DevelopingComponent,
    FixedSubCategoriesListComponent,
    FixedSubcategoryElementsListComponent,
    RegionalFilterComponent,
    ScriptMessageComponent,
    LoginComponent,
    LinkComponent,
    ContactOptionsComponent,
    SubjectComponent,
    AgeDebtComponent,
    UsersManagerComponent,
    AttachmentComponent,
    WorkflowComponent,
    FixedWorkflowListComponent,
    NewFixedWorkflowComponent,
    HomeSymbolComponent,
    EndSymbolComponent,
    HoldSymbolComponent,
    ToolboxWorkflowComponent,
    WorkflowAreaComponent,
    AdDirective,
    VerifypaymentSymbolComponent,
    EventSymbolComponent,
    NewpropertiesDirective,
    ConnectinglineSymbolComponent,
    PropertiesconectinglineDirective,
    ManagerComponent,
    FixedManagerListComponent,
    NewFixedManagementComponent,
    CalendarOptionsComponent,
    FixedEditWorkFlowComponent,
    EmailTemplatesComponent,
    MobileGroupsListComponent,
    MobileWorkflowListComponent,
    MobileBrandsListComponent,
    MobileManagerListComponent,
    MobileCategoryListComponent,
    MobileSubCategoriesListComponent,
    MobileSubCategoryElementsListComponent,
    ReportsComponent,
    NewMobileWorkflowComponent,
    NewMobileManagementGroupComponent,
    NewMobileBrandComponent,
    MobileEditWorkFlowComponent,
    NewMobileManagementComponent,
    DiscountsComponent,
    RonanConfigurationComponent,
    UpdateFixedBrandComponent,
    UpdateMobileBrandComponent,
    ViewWorkFlowComponent,
    PieChartComponent,
    FailedEventsChartComponent

  ],
  imports: [
    ChartsModule,
    DragAndDropModule,
    AngularDraggableModule,
    ResizableModule,
    FileUploadModule,
    FormsModule,
    DataTablesModule,
    TextInputAutocompleteModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      {
        path: '', component: NavigationBarComponent , children: [
          {path: '',redirectTo: '/home', pathMatch: 'full'},
          { path: 'home', component: HomeComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
          {
            path: 'management-groups', component: ManagementGroupsComponent, children: [
              {path: '',redirectTo: 'fixed', pathMatch: 'full'},
              { path: 'fixed', component: FixedGroupsListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/new-group', component: NewFixedManagementGroupComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile', component: MobileGroupsListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'mobile/new-group', component: NewMobileManagementGroupComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
            ] 
          },
          {
            path: 'manage-brands', component: ManageBrandsComponent, children: [
              {path: '',redirectTo: 'fixed', pathMatch: 'full'},
              { path: 'fixed', component: FixedBrandsListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/new-brand', component: NewFixedBrandComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'fixed/updateBrand/:name', component: UpdateFixedBrandComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile', component: MobileBrandsListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'mobile/new-brand', component: NewMobileBrandComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile/updateBrand/:name', component: UpdateMobileBrandComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
            ]
          },
          {
            path: 'events-manager', component: EventsManagerComponent, children: [
              {path: '',redirectTo: 'fixed', pathMatch: 'full'},
              { path: 'fixed', component: FixedCategoryListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/category/:id', component: FixedSubCategoriesListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/category/:id/sub-category/:ref', component: FixedSubcategoryElementsListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'mobile', component: MobileCategoryListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'mobile/category/:id', component: MobileSubCategoriesListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'mobile/category/:id/sub-category/:ref', component: MobileSubCategoryElementsListComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
            ]
          },
          { path: 'users-manager', component: UsersManagerComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ=='] } },
          {
            path: 'workflow', component: WorkflowComponent, children: [
              {path: '',redirectTo: 'fixed', pathMatch: 'full'},
              { path: 'fixed', component: FixedWorkflowListComponent,canDeactivate:[PendingChangesGuardService],canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA==']} },
              { path: 'fixed/new-workflow', component: NewFixedWorkflowComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'fixed/edit-workflow/:id', component: FixedEditWorkFlowComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile', component: MobileWorkflowListComponent,canDeactivate:[PendingChangesGuardService],canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA==']} },
              { path: 'mobile/new-workflow', component: NewMobileWorkflowComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile/edit-workflow/:id', component: MobileEditWorkFlowComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
            ]
          },
          {
            path: 'manager', component: ManagerComponent, children: [
              {path: '',redirectTo: 'fixed', pathMatch: 'full'},
              { path: 'fixed', component: FixedManagerListComponent,canDeactivate:[PendingChangesGuardService],canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA==']} },
              { path: 'fixed/new-management', component: NewFixedManagementComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile', component: MobileManagerListComponent,canDeactivate:[PendingChangesGuardService],canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA==']} },
              { path: 'mobile/new-management', component: NewMobileManagementComponent,canDeactivate:[PendingChangesGuardService], canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
            ]
          },
          {
            path: 'reports', component: ReportsComponent,canDeactivate:[PendingChangesGuardService],canActivate: [RoleGuard], data: { expectedRole: [ 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA==']}
          },
          {
            path: 'RONAnConfiguration', component: RonanConfigurationComponent, children:[
              {path: '',redirectTo: 'discounts', pathMatch: 'full'},
              { path: 'discounts', component: DiscountsComponent,canDeactivate:[PendingChangesGuardService],canActivate: [RoleGuard], data: { expectedRole: ['WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==']} }
            ] 
          } 
          
        ]
      }
    ])
  ],
  exports: [AdDirective,NewpropertiesDirective],
  entryComponents: [HoldSymbolComponent, VerifypaymentSymbolComponent, EventSymbolComponent, EndSymbolComponent, HomeSymbolComponent, ConnectinglineSymbolComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
