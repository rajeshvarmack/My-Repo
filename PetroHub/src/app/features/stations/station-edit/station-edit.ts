import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StationService } from '../../../core/services/station-service';

@Component({
  selector: 'app-station-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-edit.html',
  styleUrls: ['./station-edit.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly stationService = inject(StationService);

  stationId: string | null = null;

  ngOnInit(): void {
    this.stationId = this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.router.navigate(['/stations']);
  }
}
