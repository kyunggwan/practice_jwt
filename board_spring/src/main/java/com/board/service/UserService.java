package com.board.service;

import com.board.entity.UserEntity;
import com.board.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    // 모든 정보 출력
    public List<UserEntity> getUser() {
        try {
            List<UserEntity> userList = userRepository.findAll();
            return userList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 일부분 출력
    public List<UserEntity> searchUser() {
        try {
            List<UserEntity> userList = userRepository.findAll();
            return userList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

//    public ResponseDto<PatchUserResponseDto> patchUser(PatchUserDto dto,  String userEmail){
//        UserEntity userEntity = null;
//        String userNickname = dto.getUserNickname();
//        String userProfile = dto.getUserProfile();
//        try{
//            userEntity = userRepository.findByUserEmail(userEmail);
//            if(userEntity == null) ResponseDto.setFailed("Does Not Exist User");
//
//            userEntity.setUserNickname(userNickname);
////            userEntity.setProfile(userProfile);
//            userRepository.save(userEntity);
//
//        } catch(Exception exception){
//            exception.printStackTrace();
//            return ResponseDto.setFailed("Database Error");
//        }
//        userEntity.setUserPassword("");
//
//        PatchUserResponseDto patchUserResponseDto = new PatchUserResponseDto(userEntity);
//
//        return ResponseDto.setSuccess("Success", patchUserResponseDto );
//    }
//


}
