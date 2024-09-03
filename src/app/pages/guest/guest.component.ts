import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { DynamicListComponent } from '../../components/dynamic-list/dynamic-list.component';
import { Observable } from 'rxjs';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [FormComponent, DynamicListComponent],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {
  items$: Observable<any[]>;

  constructor(private dataService: GuestService) {
    this.items$ = this.dataService.getItems();
  }
}
