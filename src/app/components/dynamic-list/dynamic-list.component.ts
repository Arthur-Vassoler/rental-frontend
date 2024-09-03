import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dynamic-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.scss']
})
export class DynamicListComponent {
  @Input() dataService$: Observable<any[]> | null = null;

  displayedColumns: string[] = []; 
  dataSource: any[] = [];

  ngOnInit(): void {
    if (this.dataService$) {
      this.dataService$.subscribe((data: any[]) => {
        if (data.length > 0) {
          this.displayedColumns = Object.keys(data[0]);
        }
        this.displayedColumns.push('Editar', 'Deletar');
        this.dataSource = data;
      });
    }
  }

  editElement(element: any): void {
    console.log('Editar:', element);
  }

  deleteElement(element: any): void {
    console.log('Deletar:', element);
  }
}
