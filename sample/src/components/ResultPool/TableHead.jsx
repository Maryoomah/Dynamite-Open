

function TableHead({heads}) {
    return (
       <thead className="text-sm uppercase bg-gold">
            <tr>
                {heads.map((head, i) => (
                    <th key={i} scope="col" className="py-3 px-6 text-white">
                        {head.title}
                    </th>
                ))}
            </tr>
        </thead> 
    )
}

export default TableHead