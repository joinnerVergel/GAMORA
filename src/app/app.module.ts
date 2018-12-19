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
    ConnectinglineSymbolComponent
  ],
  imports: [
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
        path: '', component: NavigationBarComponent, children: [
          { path: '', component: HomeComponent },
          {
            path: 'management-groups', component: ManagementGroupsComponent, children: [
              { path: 'fixed', component: FixedGroupsListComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/new-group', component: NewFixedManagementGroupComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile', component: DevelopingComponent },
              { path: 'mobile/new-group', component: DevelopingComponent }
            ]
          },
          {
            path: 'manage-brands', component: ManageBrandsComponent, children: [
              { path: 'fixed', component: FixedBrandsListComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/new-brand', component: NewFixedBrandComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile', component: DevelopingComponent },
              { path: 'mobile/new-brand', component: DevelopingComponent }
            ]
          },
          {
            path: 'events-manager', component: EventsManagerComponent, children: [
              { path: 'fixed', component: FixedCategoryListComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/category/:id', component: FixedSubCategoriesListComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'fixed/category/:id/sub-category/:ref', component: FixedSubcategoryElementsListComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew==', 'b96MBB6lG83eurS8aj3sUA=='] } },
              { path: 'mobile', component: DevelopingComponent }
            ]
          },
          { path: 'users-manager', component: UsersManagerComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ=='] } },
          {
            path: 'workflow', component: WorkflowComponent, children: [
              { path: 'fixed', component: FixedWorkflowListComponent },
              { path: 'fixed/new-workflow', component: NewFixedWorkflowComponent, canActivate: [RoleGuard], data: { expectedRole: ['/LUXPfDT7FDLXPBKY6D9eQ==', 'WTyNx16jQ+WbAgsP8aLHuw==', 'jD0l1JABjCHFXmSPPtR2ew=='] } },
              { path: 'mobile', component: DevelopingComponent }
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
