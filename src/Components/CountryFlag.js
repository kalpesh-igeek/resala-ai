import React, { useEffect, useState } from "react"
import ReactCountryFlag from "react-country-flag"

function CountryFlag({ style }) {
    const [currentCountry, setCurrentCountry] = useState({});
    useEffect(() => {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    const country = {
                        code : result.country_calling_code,
                        flag : result.country
                     }
                    setCurrentCountry(country)
                },
                (error) => {
                    // console.log(error);
                }
            )
    }, [])
    return (
        <div className="country border border-gray rounded-md flex items-center mb-[12px] px-[15px] py-[14px]" style={style}>
            <ReactCountryFlag countryCode={currentCountry.flag} svg />
            <span className="code">{currentCountry.code}</span>
        </div>
    )
}

export default CountryFlag