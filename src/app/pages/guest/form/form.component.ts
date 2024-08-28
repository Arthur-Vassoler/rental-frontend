import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../components/dynamic-form/dynamic-form.component';
import { FormGroup, Validators } from '@angular/forms';
import { CpfCnpjValidator } from '../../../validators/customs/CpfCnpjValidator';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formFields = [
    {
      type: 'text',
      label: 'Nome',
      name: 'name',
      validation: [Validators.required],
      errorMessage: 'Nome não pode ser nulo.',
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      validation: [Validators.required, Validators.email],
      errorMessage: 'Insira um email válido.',
    },
    {
      type: 'text',
      label: 'CPF ou CNPJ',
      name: 'cpfCnpj',
      validation: [CpfCnpjValidator.cpfCnpjValidator()],
    },
    {
      type: 'text',
      label: 'Endereço',
      name: 'address',
    },
    {
      type: 'text',
      label: 'Cidade',
      name: 'city',
    },
    {
      type: 'text',
      label: 'Estado',
      name: 'state',
    },
    {
      type: 'text',
      label: 'Bairro',
      name: 'neighborhood',
    },
    {
      type: 'number',
      label: 'CEP',
      name: 'zip',
    },
    {
      type: 'text',
      label: 'Telefone',
      name: 'phone',
    },
    {
      type: 'button',
      label: 'Enviar',
      name: 'submit',
    }
  ];

  handleFormSubmit(form: FormGroup) {
    if (form.valid) {
      console.log('Dados do Formulário:', form.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}
