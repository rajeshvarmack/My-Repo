// Example: Performance comparison
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

// 🚀 OPTIMAL: OnPush + Signals
@Component({
  selector: 'app-optimal',
  template: `
    <div>Count: {{ count() }}</div>
    <div>Double: {{ doubled() }}</div>
    <button (click)="increment()">+</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ Recommended
})
export class OptimalComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update(c => c + 1); // Triggers change detection automatically
  }
}

// ⚠️ LESS OPTIMAL: Default + Signals
@Component({
  selector: 'app-default',
  template: `
    <div>Count: {{ count() }}</div>
    <div>Double: {{ doubled() }}</div>
    <button (click)="increment()">+</button>
  `,
  // Default change detection - checks ALL components on every tick
})
export class DefaultComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update(c => c + 1); // Works, but triggers broader checks
  }
}

// 🎯 FUTURE: Zoneless + OnPush (Angular 19+)
@Component({
  selector: 'app-zoneless',
  template: `
    <div>Count: {{ count() }}</div>
    <div>Double: {{ doubled() }}</div>
    <button (click)="increment()">+</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ Essential for zoneless
})
export class ZonelessComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update(c => c + 1); // Fine-grained updates only
  }
}
