PGDMP      3                |            FastX    16.2    16.2                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            !           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            "           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            #           1262    16490    FastX    DATABASE     i   CREATE DATABASE "FastX" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "FastX";
                postgres    false            �            1259    16492    big_categories    TABLE     �   CREATE TABLE public.big_categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    image text
);
 "   DROP TABLE public.big_categories;
       public         heap    postgres    false            �            1259    16491    big_categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.big_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.big_categories_id_seq;
       public          postgres    false    216            $           0    0    big_categories_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.big_categories_id_seq OWNED BY public.big_categories.id;
          public          postgres    false    215            �            1259    16527    cart    TABLE     �   CREATE TABLE public.cart (
    id integer NOT NULL,
    userid character varying(255) NOT NULL,
    product character varying(255) NOT NULL,
    price integer,
    quantity integer
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    16526    cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cart_id_seq;
       public          postgres    false    222            %           0    0    cart_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;
          public          postgres    false    221            �            1259    16501    small_categories    TABLE     �   CREATE TABLE public.small_categories (
    id integer NOT NULL,
    big_category_id integer,
    name character varying(255) NOT NULL,
    description text,
    image text,
    price integer
);
 $   DROP TABLE public.small_categories;
       public         heap    postgres    false            �            1259    16500    small_categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.small_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.small_categories_id_seq;
       public          postgres    false    218            &           0    0    small_categories_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.small_categories_id_seq OWNED BY public.small_categories.id;
          public          postgres    false    217            �            1259    16515    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    mobile character varying(20),
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16514    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    220            '           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    219            ~           2604    16495    big_categories id    DEFAULT     v   ALTER TABLE ONLY public.big_categories ALTER COLUMN id SET DEFAULT nextval('public.big_categories_id_seq'::regclass);
 @   ALTER TABLE public.big_categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16530    cart id    DEFAULT     b   ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);
 6   ALTER TABLE public.cart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222                       2604    16504    small_categories id    DEFAULT     z   ALTER TABLE ONLY public.small_categories ALTER COLUMN id SET DEFAULT nextval('public.small_categories_id_seq'::regclass);
 B   ALTER TABLE public.small_categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    16518    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2606    16499 "   big_categories big_categories_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.big_categories
    ADD CONSTRAINT big_categories_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.big_categories DROP CONSTRAINT big_categories_pkey;
       public            postgres    false    216            �           2606    16534    cart cart_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222            �           2606    16536    cart cart_product_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_key UNIQUE (product);
 ?   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_product_key;
       public            postgres    false    222            �           2606    16508 &   small_categories small_categories_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.small_categories
    ADD CONSTRAINT small_categories_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.small_categories DROP CONSTRAINT small_categories_pkey;
       public            postgres    false    218            �           2606    16524    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    220            �           2606    16522    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �           2606    16509 6   small_categories small_categories_big_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.small_categories
    ADD CONSTRAINT small_categories_big_category_id_fkey FOREIGN KEY (big_category_id) REFERENCES public.big_categories(id);
 `   ALTER TABLE ONLY public.small_categories DROP CONSTRAINT small_categories_big_category_id_fkey;
       public          postgres    false    3459    218    216           