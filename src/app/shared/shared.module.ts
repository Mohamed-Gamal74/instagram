import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidbarComponent } from './sidbar/sidbar.component';
import { SharedRoutingModule } from './shared.routing.module';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [SidbarComponent, SearchComponent, FooterComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [SidbarComponent, FooterComponent],
})
export class SharedModule {}
