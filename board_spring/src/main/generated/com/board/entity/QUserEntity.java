package com.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserEntity is a Querydsl query type for UserEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserEntity extends EntityPathBase<UserEntity> {

    private static final long serialVersionUID = 674574372L;

    public static final QUserEntity userEntity = new QUserEntity("userEntity");

    public final StringPath userAddress = createString("userAddress");

    public final StringPath userAddressDetail = createString("userAddressDetail");

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userNickname = createString("userNickname");

    public final StringPath userPassword = createString("userPassword");

    public final StringPath userPasswordCheck = createString("userPasswordCheck");

    public final StringPath userPhoneNumber = createString("userPhoneNumber");

    public QUserEntity(String variable) {
        super(UserEntity.class, forVariable(variable));
    }

    public QUserEntity(Path<? extends UserEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserEntity(PathMetadata metadata) {
        super(UserEntity.class, metadata);
    }

}

