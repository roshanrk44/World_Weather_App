const InputSearch = ({ setLocation, inputRef, setLocData }) => {
    const handleInputSearch = async (e) => {
      if (e.target.value === "") {
        dropdownMenu.innerHTML = "";
      }
      if (e.target.value != "") {
        const search_response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=5&appid=4cb69279ed43fd0729031826cae5c55c`
        );
        const searchData = await search_response.json();
        console.log(searchData);
        dropdownMenu.innerHTML = "";
        if (searchData.length === 0) {
          const noDataItem = document.createElement("div");
          noDataItem.classList.add("dropdown-item");
          noDataItem.textContent = "No data available";
          dropdownMenu.appendChild(noDataItem);
        } else {
          searchData.forEach((loc) => {
            const dropDownItem = document.createElement("div");
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.textContent = `${loc.name} ,${loc.country}`;
            dropDownItem.addEventListener("click", () => {
              document.querySelector(
                ".dropdown-input"
              ).value = `${loc.name}, ${loc.country}`;
              e.target.value = `${loc.name}, ${loc.country}`;
              dropdownMenu.innerHTML = "";
              const searchLoc = { name: loc.name, country: loc.country };
              setLocData((prevData)=> ({...prevData, temperature: "", found: true}))
              setLocation((prevLoc) => ({ ...prevLoc, ...searchLoc }));
            });
            dropdownMenu.appendChild(dropDownItem);
          });
        }
      }
    };
  
    return (
        <>
          <input
            type="text"
            className="dropdown-input input-box"
            placeholder="Type to search locations"
            onChange={handleInputSearch}
            ref={inputRef}
          />
        </>
    );
  };
  
  export default InputSearch;