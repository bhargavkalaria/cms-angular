import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../../services/role.service';
import {UserModel} from '../../../models/userModel';

@Component({
    selector: 'app-roles-list',
    templateUrl: './roles-list.component.html',
    styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
    isLoading = true;
    searchValue = '';
    visible = false;
    userList: UserModel[];
    listOfDisplayData: UserModel[];

    constructor(private roleService: RoleService) {
    }

    ngOnInit(): void {
        this.roleService.getUsers().then(res => {
            this.userList = res as UserModel[];
            this.listOfDisplayData = [...this.userList];
            this.isLoading = false;
        }).catch(error => {
            console.log(error);
        });
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }

    search(): void {
        this.visible = false;
        this.listOfDisplayData = this.userList.filter((item) => item.FName.toLowerCase().indexOf(this.searchValue) !== -1);
    }
}
