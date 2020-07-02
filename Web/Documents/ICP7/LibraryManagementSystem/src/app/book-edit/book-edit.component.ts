import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit  {

  bookForm: FormGroup;
  isbn: String = '';
  title: String = '';
  description: String = '';
  author: String = '';
  publisher: String = '';
  published_year: String = '';
  updated_date: Date;
  id: any;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null, Validators.required],
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'author': [null, Validators.required],
      'publisher': [null, Validators.required],
      'published_year': [null, Validators.required]
    });
    this.id = this.route.snapshot.params['id'];

    this.api.getBook(this.id)
      .subscribe(res => {
        this.isbn = res['isbn'];
        this.title = res['title'];
        this.author = res['author'];
        this.description = res['description'];
        this.published_year = res['published_year'];
        this.publisher = res['publisher'];
        this.updated_date = res['updated_date'];
      }, (err) => {
        console.log(err);
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateBook(this.id, form)
      .subscribe(res => {
        this.router.navigate(['/book']);
      }, (err) => {
        console.log(err);
      });
  }

}
