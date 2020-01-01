interface Selector {
    css: string,
}

interface RegionCoordinates {
    left: number,
    top: number,
    width: number,
    height: number,
}

interface FloatingRegion {
    target: RegionCoordinates | Selector | number,
    maxUp: number,
    maxDown: number,
    maxLeft: number,
    maxRight: number,
}

interface ExecutionMode {
    isVisualGrid?: boolean,
    isCssStitching?: boolean,
    isScrollStitching?: boolean,
    useStrictName?: boolean,    
}

declare module Hooks {
  export interface Setup {
    (options: { branchName: string, baselineTestName: string, host: string, executionMode: ExecutionMode }): Promise<any>
  }

  export interface Cleanup {
    (): Promise<any>
  }
}

declare module EyesApi {
	export interface Abort {
			(): Promise<any> 
	}

	export interface CheckFrame {
			(target: Selector | Array<Selector>, options: { isClassicApi?: boolean, isFully?: boolean, tag?: string, matchTimeout?: number }): Promise<any>
	}

	export interface CheckRegion {
			(
					target: Selector | Array<Selector> | RegionCoordinates,
					options: {
							isClassicApi?: boolean,
							isFully?: boolean,
							inFrame: Selector,
							ignoreRegion: Selector | RegionCoordinates,
							tag?: string,
							matchTimeout?: number,
					}
			): Promise<any>
	}

	export interface CheckWindow {
			(options: {
					isClassicApi?: boolean,
					isFully?: boolean,
					ignoreRegion?: Selector | RegionCoordinates,
					floatingRegion?: FloatingRegion,
					scrollRootElement?: Selector,
					tag?: string,
					matchTimeout?: number, 
			}): Promise<any>
	}

	export interface Close {
			(throwsException?: boolean) : Promise<any>
	}

  export interface getAllTestResults {
      () : Promise<any>
  }

	export interface Open {
			(options: {appName: string, viewportSize: string}): Promise<any>
	}

	export interface ScrollDown {
			(pixes: number): Promise<any>
	}

	export interface SwitchToFrame {
			(selector: Selector): Promise<any>
	}

	export interface Type {
			(selector: Selector, inputText: string): Promise<any>
	}

	export interface Visit {
			(url: string): Promise<any>
	}
}
