import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReadPointProxyService } from '../../services/read-point-proxy.service';
import * as mapboxgl from 'mapbox-gl';
import { settings } from '../../settings';

@Component({
  selector: 'app-read-points',
  templateUrl: './read-points.component.html',
  styleUrls: ['./read-points.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReadPointsComponent implements OnInit, OnDestroy {
  public readPoints: Array<any> = new Array<any>();
  private subscriptions: Subscription[] = [];
  map: mapboxgl.Map;

  constructor(private readPointProxySvc: ReadPointProxyService) {}

  public ngOnInit() {
    this.readPointProxySvc.getAll().subscribe(
      data => {
        this.readPoints = data;
        this.setupMapbox(data);
      },
      err => console.log(err)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => {
      e.unsubscribe();
    });
  }

  private setupMapbox(readPoints): void {
    // (mapboxgl as any).accessToken = settings.mapbox.accessToken;
    // OR ... since the accessToken property is readonly, this is the
    // fix
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      settings.mapbox.accessToken
    );

    this.map = new mapboxgl.Map({
      container: 'map',
      style: settings.mapbox.style,
      scrollZoom: false
      // center: [-118.113491, 34.111745],
      // zoom: 10
      // interactive: true
    });

    const bounds = new mapboxgl.LngLatBounds();

    readPoints.forEach(readPoint => {
      // Create marker
      const el = document.createElement('div');
      el.className = 'marker';

      // Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        // setLngLat() takes an array of coordinates
        .setLngLat(readPoint.coordinates)
        .addTo(this.map);

      // Add popup
      new mapboxgl.Popup({
        offset: 30
      })
        .setLngLat(readPoint.coordinates)
        .setHTML(`<p>${readPoint.description}</p>`)
        .addTo(this.map);

      // Extend map bounds to include current location
      bounds.extend(readPoint.coordinates);
    });

    this.map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
      }
    });
  }
}
