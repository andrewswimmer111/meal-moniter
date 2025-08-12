interface DateTimeInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
}

const SelectDate: React.FC<DateTimeInputProps> = ({
  label = "Optional: Edit date eaten",
  value,
  onChange,
  id = "myDateTime",
  name = "eventDateTime",
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="datetime-local"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SelectDate;
