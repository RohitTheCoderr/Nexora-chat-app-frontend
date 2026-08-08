import { Button } from "./components/ui/button.tsx";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button variant="secondary">secondary Button</Button>
      <Button variant="outline">outline Button</Button>
      <Button variant="ghost">ghost Button</Button>
      <Button variant="destructive">destructive Button</Button>
      <Button variant="link">link Button</Button>
      <Button variant="default">default Button</Button>
    </div>
  );
}

export default App;
