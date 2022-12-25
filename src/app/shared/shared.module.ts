import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidbarComponent } from './sidbar/sidbar.component';
import { SharedRoutingModule } from './shared.routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SidbarComponent, SearchComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [SidbarComponent],
})
export class SharedModule {}
