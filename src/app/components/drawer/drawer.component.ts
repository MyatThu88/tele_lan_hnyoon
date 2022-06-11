import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { MovieGenreList } from '../../env/env';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @ViewChild('body', { read: ElementRef }) body: ElementRef;
  @Output('openStateChanged') opneState: EventEmitter<boolean> =
    new EventEmitter();
  openHeight = 0;
  isOpen = false;
  movieGenreList = MovieGenreList;
  constructor(
    private plt: Platform,
    private gestuerCtrl: GestureController,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.movieGenreList);
  }
  async ngAfterViewInit() {
    this.openHeight = (this.plt.height() / 100) * 93;
    const drawer = this.drawer.nativeElement;
    const gesture = await this.gestuerCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      disableScroll: false,
      direction: 'y',
      onMove: (ev) => {
        if (ev.deltaY < -this.openHeight || (this.isOpen && ev.deltaY < 0))
          return;
        if (this.isOpen) {
          drawer.style.transform = `translateY(${
            -this.openHeight + ev.deltaY
          }px)`;
        } else {
          drawer.style.transform = `translateY(${ev.deltaY}px)`;
        }
      },
      onEnd: (ev) => {
        if (ev.deltaY < -1 && !this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = `translateY(${-this.openHeight}px)`;
          this.isOpen = true;
        } else if (ev.deltaY > 1 && this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = '';
          this.isOpen = false;
        }
      },
    });
    gesture.enable(true);
    const gesture2 = this.gestuerCtrl.create({
      el: this.body.nativeElement,
      gestureName: 'preventSwipeGesture',
      direction: 'y',
      gesturePriority: 5,
      onMove: (ev) => {},
      onEnd: (ev) => {},
    });
    gesture2.enable(true);
    this.searchService.bottomDrawerEventEmitter.subscribe(() => {
      if (this.isOpen) {
        drawer.style.transition = '.4s ease-out';
        drawer.style.transform = '';
        this.isOpen = false;
      } else {
        drawer.style.transition = '.4s ease-out';
        drawer.style.transform = `translateY(${-this.openHeight}px)`;
        this.isOpen = true;
      }
    });
  }

  handleRoute(index) {
    this.router.navigate(['genre-detail', index]);
  }
}
