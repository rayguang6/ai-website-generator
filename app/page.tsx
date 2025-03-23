import WireframeRenderer from './components/wireframe/WireframeRenderer';
import { sampleWireframe } from './data/sampleWireframe';

export default function Home() {
  return (
    <main className="min-h-screen">
      <WireframeRenderer initialData={sampleWireframe} />
    </main>
  );
}
