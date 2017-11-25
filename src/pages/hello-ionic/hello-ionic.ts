import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import * as rp from 'request-promise';
import 'rxjs/add/operator/map';
const API_URL = 'http://127.0.0.1:3000/'

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {
  videos: any;
  radius: number;
  // coords: Coordinates<{latitude: number, longitude: number}>;
  coords: any;

  constructor(private geolocation: Geolocation, private youtube: YoutubeVideoPlayer) {
    this.radius = 1;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords;
    })
    .then(this.getVideos.bind(this))
    .catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getVideos() {
    const uri = `${API_URL}search.json?lat=${this.coords.latitude}&lng=${this.coords.longitude}&radius=${this.radius*1000}`;
    return rp({uri: uri, json: true}).then((res) => {
      this.videos = res.videos;
      console.log(this.videos);
      console.log(this.videos[1].youtubeId);
      this.youtube.openVideo(this.videos[1].youtubeId);
    })
  }
}
