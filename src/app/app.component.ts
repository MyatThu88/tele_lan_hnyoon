import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [StatusBar],
})
export class AppComponent {
  constructor(private statusBar: StatusBar, private platform: Platform) {
    this.initilizedApp();
  }
  initilizedApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
    });
  }
}
