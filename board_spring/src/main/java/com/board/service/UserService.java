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

    // 모든 유저 출력
    public List<UserEntity> getUser() {
        try {
            List<UserEntity> userList = userRepository.findAll();
            return userList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 검색 유저 출력
    public List<UserEntity> findUser(String keyword) {
        try {
           List <UserEntity> user = userRepository.findByUserEmailContaining(keyword);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 일부분 출력
    public void changeUser(UserEntity userEntity) {
        try {
            UserEntity userEntity2 = userRepository.findByUserEmail(userEntity.getUserEmail());
            userEntity2.setUserNickname(userEntity.getUserNickname());
            userEntity2.setUserPhoneNumber(userEntity.getUserPhoneNumber());
            userEntity2.setUserAddress(userEntity.getUserAddress());
            userEntity2.setUserAddressDetail(userEntity.getUserAddressDetail());
            userRepository.save(userEntity2);

            System.out.println(userEntity.getUserEmail());


        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    public void deleteUser(String userEmail) {
        try {
            userRepository.deleteById(userEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("deleteUser success");
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
