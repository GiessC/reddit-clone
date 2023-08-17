interface Error404Props {
    type?: string;
}

const Error404 = ({ type='Page' }: Error404Props) => {
    return (
        <div>
            <h1>404 Error</h1>
            <p>{type} not found</p>
        </div>
    );
};

export default Error404;