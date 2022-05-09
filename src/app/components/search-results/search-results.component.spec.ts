import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';

@Component({
  selector: 'ngb-pagination',
  template: '',
})
class MockPaginationComponent {
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() collectionSize: number = 55;
  @Input() maxSize: number = 5;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, MockPaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
