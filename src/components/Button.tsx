type ButtonProps = {
    label: string;
    onClick?: () => void;
    className?: string;
};

export default function Button({ label, onClick, className }: ButtonProps) {
    return (
        <button
            className={`px-6 py-3 bg-muted-blue text-white rounded hover:bg-soft-coral transition ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}