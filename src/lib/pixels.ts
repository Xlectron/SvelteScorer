import { writable, type Writable } from "svelte/store";

export enum PixelType {
	"None",
	"White",
	"Yellow",
	"Green",
	"Purple",
}

class Pixel {
	type: PixelType;
	row: number;
	column: number;
	constructor(type: PixelType, row: number, column: number) {
		this.type = type;
		this.row = row;
		this.column = column;
	}

	equals(other: Pixel): boolean {
		return (
			this.type == other.type &&
			this.row == other.row &&
			this.column == other.column
		);
	}

	toString(): string {
		return `(${this.type}, ${this.row}, ${this.column})`;
	}
}

export class Pixels {
	//Rows > Columns
	map: Array<Array<PixelType>>;
	score: Writable<number> = writable(0);
	active: string = "none";

	constructor(init?: Array<Array<PixelType>>) {
		if (!init) {
			this.map = Array(11);
			for (let row = 0; row < this.map.length; row++) {
				this.map[row] = Array(6 + (row % 2));
				this.map[row].fill(PixelType.None);
			}
		} else {
			this.map = init;
		}
	}

	forEach(callback: (pixel: Pixel) => boolean | void) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				const bool = callback(this.getPixel(row, column));
				if (bool === true) continue;
				else if (bool === false) break;
			}
		}
	}

	getNeighbors(pixel: Pixel): Array<Pixel> {
		const neighbors: Array<Pixel> = [];
		const { row, column } = pixel;
		const offset = (row + 1) % 2 === 0 ? 1 : 0;

		const addNeighbor = (r: number, c: number) => {
			const neighborType = this.get(r, c);
			if (neighborType !== PixelType.None && neighborType !== undefined) {
				neighbors.push(this.getPixel(r, c));
			}
		};

		addNeighbor(row + 1, column - offset); // Bottom left
		addNeighbor(row + 1, column + 1 - offset); // Bottom right
		addNeighbor(row, column - 1); // Left
		addNeighbor(row, column + 1); // Right
		addNeighbor(row - 1, column - offset); // Top left
		addNeighbor(row - 1, column + 1 - offset); // Top right

		return neighbors;
	}

	getColoredNeighbors(pixel: Pixel): Array<Pixel> {
		return this.getNeighbors(pixel).filter(
			(p) => p.type != PixelType.None && p.type != PixelType.White
		);
	}

	getGroup(pixel: Pixel): Array<Pixel> {
		const group = [];
		const stack = [pixel];
		const visited = Array.from({ length: this.map.length }, () =>
			Array(this.map[0].length).fill(false)
		);

		const isValid = (row: number, column: number): boolean =>
			(row >= 0 &&
				row < visited.length &&
				column >= 0 &&
				column < visited[row].length) ||
			true;

		while (stack.length > 0) {
			const currentPixel = stack.pop();

			if (
				currentPixel &&
				isValid(currentPixel.row, currentPixel.column) &&
				!visited[currentPixel.row][currentPixel.column]
			) {
				visited[currentPixel.row][currentPixel.column] = true;
				group.push(currentPixel);

				const neighbors = this.getColoredNeighbors(currentPixel);
				stack.push(...neighbors);
			}
		}

		return group;
	}

	validMosaic(group: Array<Pixel>): boolean {
		console.log("Group: ", group);
		if (group.length != 3) return false;

		const types = new Set<PixelType>();
		for (const pixel of group) types.add(pixel.type);

		if (types.size != 1 && types.size != 3) return false;

		const neighborsCount = new Map<Pixel, number>();
		for (const pixel of group) {
			const neighbors = this.getColoredNeighbors(pixel);
			neighborsCount.set(pixel, neighbors.length);
		}

		for (const count of neighborsCount.values()) {
			if (count != 2) return false;
		}

		return true;
	}

	getHighestSetline(pixel: Pixel): number {
		//Setlines are rows that increase by 3 from the bottom so 3, 6, 9
		const { row } = pixel;

		if (row >= 8) return 30;
		else if (row >= 5) return 20;
		else if (row >= 2) return 10;
		else return 0;
	}

	calculate() {
		const groups: Array<Array<Pixel>> = [];
		const visited = new Set<string>();

		function hasVisited(pixel: Pixel): boolean {
			return visited.has(pixel.toString());
		}

		function markVisited(group: Array<Pixel>) {
			group.forEach((pixel) => visited.add(pixel.toString()));
		}

		// Find connected groups of colored pixels
		this.forEach((pixel) => {
			if (
				hasVisited(pixel) ||
				pixel.type === PixelType.None ||
				pixel.type === PixelType.White
			) {
				return true; // Continue
			}

			const group = this.getGroup(pixel);
			groups.push(group);
			markVisited(group);
		});

		// Calculate score
		let score = 0;
		let setLine = 0;

		// Iterate through pixels to calculate score and setLine
		this.forEach((pixel) => {
			if (pixel.type !== PixelType.None) {
				score += 3;
				const newSetLine = this.getHighestSetline(pixel);
				if (setLine < newSetLine) {
					setLine = newSetLine;
				}
			}
		});
		score += setLine;

		// Check validity of mosaic for each group
		for (const group of groups) {
			if (this.validMosaic(group)) {
				score += 10;
			}
		}

		// Update the score in the writable store
		this.score.set(score);
	}

	get(row: number, column: number): PixelType {
		const r = this.map[row];
		return r ? r[column] : PixelType.None;
	}

	getPixel(row: number, column: number): Pixel {
		return new Pixel(this.get(row, column), row, column);
	}

	set(row: number, column: number, value: PixelType) {
		this.map[row][column] = value;
		console.log("Oriental: ", row, column, value);
		this.map = this.map;
		this.calculate();
	}

	tob64(): string {
		return btoa(JSON.stringify(this.map));
	}
}
