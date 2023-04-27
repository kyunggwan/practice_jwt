package com.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 259587632L;

    public static final QMember member = new QMember("member1");

    public final EnumPath<com.board.domain.Authority> authority = createEnum("authority", com.board.domain.Authority.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userPassword = createString("userPassword");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

