const Loader = ({ className }: { className?: string }) => {
    return (
        <div
            className={`size-12 border-t-4 border-purple-500 border-solid rounded-full animate-spin ${className}`}
        ></div>
    );
};

export default Loader;
