import { WireframeData, Section } from '@/app/types/wireframe';

// Store for active wireframes
class WireframeStore {
  private static instance: WireframeStore;
  private activeWireframe: WireframeData | null = null;

  private constructor() {}

  static getInstance(): WireframeStore {
    if (!WireframeStore.instance) {
      WireframeStore.instance = new WireframeStore();
    }
    return WireframeStore.instance;
  }

  setActiveWireframe(wireframe: WireframeData) {
    this.activeWireframe = wireframe;
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeWireframe', JSON.stringify(wireframe));
    }
  }

  getActiveWireframe(): WireframeData | null {
    if (!this.activeWireframe && typeof window !== 'undefined') {
      const stored = localStorage.getItem('activeWireframe');
      if (stored) {
        this.activeWireframe = JSON.parse(stored);
      }
    }
    return this.activeWireframe;
  }

  clearActiveWireframe() {
    this.activeWireframe = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('activeWireframe');
    }
  }
}

export const wireframeStore = WireframeStore.getInstance();
export default wireframeStore; 