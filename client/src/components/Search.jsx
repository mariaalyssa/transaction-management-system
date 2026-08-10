function Search({value, onChange}){
    return(
        <div className="search">
            <input type="text"
             placeholder="Search transactions..." 
             value={value}
             onChange={onChange}
            />
        </div>
    )
}

export default Search