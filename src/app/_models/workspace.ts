export class WorkSpaceDisplayVM {
    public primary: WorkSpaceVM = new WorkSpaceVM();
    public alternative: WorkSpaceVM = new WorkSpaceVM();;
}

export class WorkSpaceVM {
    public userDisplay: boolean = false;
    public workspaceName: string = '';
    public workspaceUrl: string = '';
    public committeeName: string = '';
}