import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './layout/menu/menu.component';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiForModule } from '@taiga-ui/cdk';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpCacheInterceptorModule,
  useHttpCacheLocalStorage,
} from '@ngneat/cashew';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [MenuComponent, LayoutComponent],
  exports: [MenuComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    TuiIslandModule,
    TuiForModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    useHttpCacheLocalStorage,
  ],
})
export class CoreModule {}
