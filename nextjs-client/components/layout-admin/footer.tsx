export function Footer() {
    return (
        <footer className="border-t bg-slate-50/40 py-6 px-6 dark:bg-slate-950/40">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} NextGen Admin. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                        Terms
                    </a>
                    <a href="#" className="hover:underline">
                        Privacy
                    </a>
                </div>
            </div>
        </footer>
    );
}
