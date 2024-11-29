
type Props = {
    children: React.ReactNode;
    isLoading: boolean;
};

export const Loading = ({isLoading, children}: Props) => {
    return (
        isLoading ? <div>
            <h1>Loading...</h1>
        </div> : <>{children}</>
    );
}