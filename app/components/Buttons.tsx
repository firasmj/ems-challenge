
type btnProps = {
    text: string;
}

const SubmitButton: React.FC<btnProps> = ({ text }) => {
    return (
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            {text}
        </button>
    )
}

const CancelButton: React.FC<btnProps> = ({ text }) => {
    return (
        <button
            onClick={() => window.history.back()}
            className="bg-red-500 ml-5 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
        >
            {text}
        </button>
    )
}

const DisabledButton: React.FC<btnProps> = ({ text }) => {
    return (
        <button
            disabled
            className="bg-gray-500 ml-5 text-white font-bold py-2 px-4 rounded"
        >
            {text}
        </button>
    )
}

export { SubmitButton, DisabledButton, CancelButton };