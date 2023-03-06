import { Paper, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
	handleSearch: (value: string) => void;
};

function SearchBar({ handleSearch }: SearchBarProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleSearch(e.target.value);
	};

	return (
		<Paper component='form' className='flex items-center w-96 py-0.5 px-1'>
			<InputBase
				className='w-full ml-2 flex'
				placeholder='Enter course name...'
				onChange={handleChange}
			/>
			<IconButton type='button' aria-label='search' className='p-2.5'>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}

export default SearchBar;
