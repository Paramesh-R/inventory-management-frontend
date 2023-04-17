import React from 'react'
import Select from 'react-select'



const SelectDropdown = (props) => {
    return (
        <>

            <Select options={props.dataList} defaultInputValue="" onChange={(e) => console.log(e)} />

        </>
    )
}

export default SelectDropdown

