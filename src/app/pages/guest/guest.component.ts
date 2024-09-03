import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { DynamicListComponent } from '../../components/dynamic-list/dynamic-list.component';
import { Observable } from 'rxjs';
import { GuestService } from '../../services/guest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [FormComponent, DynamicListComponent, CommonModule],
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {
  items$: Observable<any[]>;
  isFormVisible = false;

  constructor(private dataService: GuestService) {
    this.items$ = this.dataService.getItems();
  }

  openForm(): void {
    this.isFormVisible = true;
  }

  onFormSubmitted(event: any): void {
    this.isFormVisible = false;
    this.items$ = this.dataService.getItems();
  }

  goBackToList(): void {
    this.isFormVisible = false;
  }
}
