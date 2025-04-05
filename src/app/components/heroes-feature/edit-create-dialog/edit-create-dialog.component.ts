import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-create-dialog',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButton,
    NgIf,
    MatDialogClose,
  ],
  templateUrl: './edit-create-dialog.component.html',
  styleUrl: './edit-create-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCreateDialogComponent {
  builder: FormBuilder = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA);
  constructor() {
    this.form.patchValue({
      image: this.data.hero?.image,
      desc: this.data.hero?.desc,
      position: this.data.hero?.position,
    });
  }

  public form = this.builder.group({
    image: this.builder.control('', [Validators.required]),
    desc: this.builder.control('', [Validators.required]),
    position: this.builder.control('', [Validators.required]),
  });

  get infoFullFields() {
    return this.form.value;
  }
}
