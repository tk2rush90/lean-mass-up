import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingModule} from './pages/landing/landing.module';
import {LandingComponent} from './pages/landing/landing.component';
import {CalculatorComponent} from './pages/calculator/calculator.component';
import {CalculatorModule} from './pages/calculator/calculator.module';
import {HideAnimationGuard} from './guards/hide-animation.guard';
import {NutritionComponent} from './pages/nutrition/nutrition.component';
import {NutritionModule} from './pages/nutrition/nutrition.module';
import {RecordComponent} from './pages/record/record.component';
import {RecordModule} from './pages/record/record.module';
import {AuthGuard} from './guards/auth.guard';
import {ManageComponent} from './pages/manage/manage.component';
import {ManageModule} from './pages/manage/manage.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    canDeactivate: [
      HideAnimationGuard,
    ]
  },
  {
    path: 'nutrition',
    component: NutritionComponent,
    canDeactivate: [
      HideAnimationGuard,
    ],
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'record',
    component: RecordComponent,
    canDeactivate: [
      HideAnimationGuard,
    ],
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'manage',
    component: ManageComponent,
    canDeactivate: [
      HideAnimationGuard,
    ],
    canActivate: [
      AuthGuard,
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LandingModule,
    CalculatorModule,
    NutritionModule,
    RecordModule,
    ManageModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
