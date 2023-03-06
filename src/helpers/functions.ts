import moment from 'moment';

export const formatTime = (duration: number) => {
	if (Math.floor(duration / 60) < 10 && duration % 60 < 10)
		return `0${Math.floor(duration / 60)}:0${duration % 60}`;
	if (Math.floor(duration / 60) < 10)
		return `0${Math.floor(duration / 60)}:${duration % 60}`;
	if (duration % 60 < 10)
		return `${Math.floor(duration / 60)}:0${duration % 60}`;
	return `${Math.floor(duration / 60)}:${duration % 60}`;
};

export const formatDate = (creationDate: string) => {
	return moment(new Date(creationDate).getTime()).format('DD.MM.yyyy');
};

export const createTodayDate = () => {
	console.log('TODAY:', moment().format('MM/DD/yyyy'));
	return moment().format('MM/DD/yyyy');
};
