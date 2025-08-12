import { useState } from "react";

type HasId = { id: number };

type SearchSelectProps<T extends HasId> = {
    options: T[];
    placeholder: string;
    renderOption: (option: T) => string;
    onSelect: (option: T) => void;
};


const SearchSelect = <T extends HasId>({ options, placeholder, renderOption, onSelect }: SearchSelectProps<T>) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const availableKeywords = options.filter((option) =>
        renderOption(option).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowSuggestions(value.length > 0);
    };
    const handleSelect = (option: T) => {
        setSearchTerm(renderOption(option));
        setShowSuggestions(false);
        onSelect(option); // send value to parent
    };

    return (
        <>
            <div>
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setShowSuggestions(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && availableKeywords.length > 0) {
                            e.preventDefault();
                            handleSelect(availableKeywords[0]); // select first suggestion
                        }
                    }}
                ></input>
            </div>
            {showSuggestions && availableKeywords.length > 0 && (
                <div>
                    <ul>
                        {availableKeywords.map((option) => (
                            <li 
                                key={option.id} 
                                onClick={() => handleSelect(option)}
                                style={{ cursor: "pointer" }}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {renderOption(option)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default SearchSelect