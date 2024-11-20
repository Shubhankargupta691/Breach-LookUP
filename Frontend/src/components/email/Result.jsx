const Results = ({ data }) => {
    if (!data) return null;

    return (
        <div className="text-center mt-5 max-w-3xl w-full">
            <h2 className="text-xl text-white">{data.found ? `${data.found} password(s) found` : 'No password found'}</h2>
            {data.found > 0 && (
                <table className="w-full mt-3 border-collapse text-white">
                    <thead>
                        <tr className="bg-black-100">
                            <th className="py-2 px-4 border border-gray-600 text-left">Password</th>
                            <th className="py-2 px-4 border border-gray-600 text-right">SHA-1 Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.result.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border border-gray-600 text-left">{item.password}</td>
                                <td className="py-2 px-4 border border-gray-600 text-right">{item.sha1}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Results;
