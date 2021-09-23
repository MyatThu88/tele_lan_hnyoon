import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective implements OnInit {
  @Input('appHideHeader') toolbar: any;
  constructor(private domCtrl: DomController) {}
  ngOnInit() {
    this.toolbar = this.toolbar.el;
  }
  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    let scrollTop = $event.detail.scrollTop;
    let children = [0, 1, 2];
    if (scrollTop >= 255) {
      scrollTop = 255;
    }
    const hexDist = scrollTop.toString(16);
    if (scrollTop == 0) {
      this.domCtrl.write(() => {
        children.map((n) => {
          this.toolbar.children[n].style.removeProperty(
            'background-color',
            `#f4f5f8${hexDist}`
          );
          this.toolbar.children[n].children[0].children[0].style.removeProperty(
            'color',
            `#000000${hexDist}`
          );
        });
      });
    }
    this.domCtrl.write(() => {
      children.map((n) => {
        this.toolbar.children[n].style.setProperty(
          'background-color',
          `#f4f5f8${hexDist}`
        );
        this.toolbar.children[n].children[0].children[0].style.setProperty(
          'color',
          `#000000${hexDist}`
        );
      });
      this.toolbar.style.setProperty('--background', `#f4f5f8${hexDist}`);
    });
  }
}
