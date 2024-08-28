import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

interface FieldConfig {
  type: string;
  label: string;
  name: string;
  options?: { label: string; value: any }[];
  errorMessage?: string;
  validation?: any[];
}

const customMaskConfig = {
  validation: false,
  patterns: {
    '0': { pattern: new RegExp('[0-9]') },
  },
  masks: {
    CPF_CNPJ: {
      mask: [
        '000.000.000-00',
        '00.000.000/0000-00',
      ],
    },
  },
};

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask(customMaskConfig)],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Input() onSubmitCallback!: (form: FormGroup) => void;
  form!: FormGroup;
  hasSubmitButton: boolean = false;

  constructor(private fb: FormBuilder) {}

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);

    if (control?.hasError('required')) return 'Este campo é obrigatório.';
    if (control?.hasError('email')) return 'Insira um email válido.';
    if (control?.hasError('cpfCnpjInvalid')) return 'CPF/CNPJ inválido.';

    return '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.fields.forEach((field) => {
      const control = this.fb.control('', field.validation ? field.validation : []);
      this.form.addControl(field.name, control);
    });
  }

  hasValidControl(type: string): boolean {
    return ['text', 'password', 'email', 'select'].includes(type);
  }

  onSubmit() {
    if (this.onSubmitCallback) {
      this.onSubmitCallback(this.form);
    }
  }
}
