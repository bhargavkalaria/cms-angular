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

    userList: UserModel[];

    constructor(private roleService: RoleService) {
    }

    ngOnInit(): void {
        this.roleService.getUsers().then(res => {
            this.userList = res as UserModel[];
            this.isLoading = false;
        }).catch(error => {
            console.log(error);
        });
    }

}
