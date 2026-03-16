export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm text-secondary leading-relaxed max-w-md mx-auto">
          Robert Hu is an e-commerce operator and builder focused on how AI is
          changing product discovery.
        </p>
        <p className="mt-4 text-xs text-secondary/60">
          &copy; {new Date().getFullYear()} AI Visibility Checker
        </p>
      </div>
    </footer>
  );
}
