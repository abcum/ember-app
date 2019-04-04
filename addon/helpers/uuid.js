import Helper from '@ember/component/helper';

export default Helper.extend({

	compute() {
		let d = new Date().getTime();
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			let r = (d + Math.random()*16)%16 | 0;
			return ( c === 'x' ? r : (r&0x3|0x8) ).toString(16);
		});
	}

});
